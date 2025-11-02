package main.java.com.offerzone.retailer.model;

/**
 * Retailer Status Enum - Simple status tracking for retailers
 */
public enum RetailerStatus {
    PENDING,    // Awaiting approval
    ACTIVE,     // Approved and active
    INACTIVE,   // Temporarily inactive
    SUSPENDED,  // Suspended for policy violations
    DELETED     // Soft deleted
}