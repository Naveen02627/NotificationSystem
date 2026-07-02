package com.NotificationAPI.NotificationProducer.Config;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import java.util.Hashtable;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

public class EmailDomainValidator implements ConstraintValidator<ValidEmail, String> {

    // Simple cache: domain -> Boolean (valid), with TTL of 1 hour
    private static final ConcurrentHashMap<String, CacheEntry> cache = new ConcurrentHashMap<>();
    private static final long CACHE_TTL_MS = TimeUnit.HOURS.toMillis(1);

    private static class CacheEntry {
        final boolean valid;
        final long timestamp;

        CacheEntry(boolean valid) {
            this.valid = valid;
            this.timestamp = System.currentTimeMillis();
        }

        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > CACHE_TTL_MS;
        }
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.isEmpty() || !email.contains("@")) {
            return false;
        }

        String domain = email.substring(email.indexOf('@') + 1).toLowerCase();

        // Check cache
        CacheEntry entry = cache.get(domain);
        if (entry != null && !entry.isExpired()) {
            return entry.valid;
        }

        // Perform DNS lookup with timeout and fallback
        boolean valid = checkDomain(domain);

        // Store in cache
        cache.put(domain, new CacheEntry(valid));

        return valid;
    }

    private boolean checkDomain(String domain) {
        try {
            Hashtable<String, String> env = new Hashtable<>();
            env.put("java.naming.factory.initial", "com.sun.jndi.dns.DnsContextFactory");
            // Timeouts in milliseconds
            env.put("com.sun.jndi.dns.timeout.initial", "2000");
            env.put("com.sun.jndi.dns.timeout.retries", "1");
            DirContext ctx = new InitialDirContext(env);

            // Try MX record first
            try {
                ctx.getAttributes(domain, new String[]{"MX"});
                return true;
            } catch (NamingException e) {
                // MX not found, try A record
                try {
                    ctx.getAttributes(domain, new String[]{"A"});
                    return true;
                } catch (NamingException ex) {
                    return false;
                }
            }
        } catch (NamingException e) {
            // DNS service not available or other error
            return false;
        }
    }

    // Optional: clean up expired entries periodically (you can call this via a scheduler)
    public static void cleanCache() {
        cache.entrySet().removeIf(entry -> entry.getValue().isExpired());
    }
}