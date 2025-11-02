package main.java.com.offerzone.offer.model;

/**
 * Offer Status Enum - Simple status tracking for offers
 */
public enum OfferStatus {
    DRAFT,      // Created but not published
    ACTIVE,     // Live and available to consumers
    PAUSED,     // Temporarily paused by retailer
    EXPIRED,    // Past validity date
    EXHAUSTED,  // Maximum redemptions reached
    CANCELLED,  // Cancelled by retailer
    DELETED     // Soft deleted
}