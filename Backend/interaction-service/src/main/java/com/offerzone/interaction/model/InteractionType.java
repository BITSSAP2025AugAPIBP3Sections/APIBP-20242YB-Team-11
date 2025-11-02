package main.java.com.offerzone.interaction.model;

/**
 * Interaction Type Enum - Different types of user interactions
 */
public enum InteractionType {
    VIEW,       // User viewed an offer
    SAVE,       // User saved/bookmarked an offer
    UNSAVE,     // User removed bookmark
    SHARE,      // User shared an offer
    REDEEM,     // User redeemed an offer
    CLICK,      // User clicked on offer link
    SEARCH,     // User searched for offers
    FILTER      // User applied filters
}