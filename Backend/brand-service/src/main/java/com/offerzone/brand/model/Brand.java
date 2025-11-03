package com.offerzone.brand.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "brands")
public class Brand {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Brand name is required")
    @Size(max = 100, message = "Brand name must not exceed 100 characters")
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    
    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(name = "description", length = 500)
    private String description;
    
    @Column(name = "logo_url", length = 500)
    private String logoUrl;
    
    @Column(name = "website_url", length = 500)
    private String websiteUrl;
    
    @Email(message = "Please provide a valid email address")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    @Column(name = "contact_email", length = 150)
    private String contactEmail;
    
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Please provide a valid phone number")
    @Column(name = "contact_phone", length = 15)
    private String contactPhone;
    
    // Shop/Location specific fields
    @Size(max = 200, message = "Address must not exceed 200 characters")
    @Column(name = "address", length = 200)
    private String address;
    
    @Size(max = 100, message = "City must not exceed 100 characters")
    @Column(name = "city", length = 100)
    private String city;
    
    @Size(max = 100, message = "State must not exceed 100 characters")
    @Column(name = "state", length = 100)
    private String state;
    
    @Pattern(regexp = "^[0-9]{5,10}$", message = "Please provide a valid zip code")
    @Column(name = "zip_code", length = 10)
    private String zipCode;
    
    @Size(max = 100, message = "Country must not exceed 100 characters")
    @Column(name = "country", length = 100)
    private String country;
    
    // Business details
    @Enumerated(EnumType.STRING)
    @Column(name = "brand_type", nullable = false)
    private BrandType brandType = BrandType.BRAND;
    
    @Size(max = 100, message = "Category must not exceed 100 characters")
    @Column(name = "category", length = 100)
    private String category;
    
    @DecimalMin(value = "0.0", message = "Rating must be between 0 and 5")
    @DecimalMax(value = "5.0", message = "Rating must be between 0 and 5")
    @Column(name = "rating")
    private Double rating;
    
    @Min(value = 0, message = "Review count cannot be negative")
    @Column(name = "review_count")
    private Integer reviewCount = 0;
    
    @Column(name = "is_verified")
    private Boolean isVerified = false;
    
    @Column(name = "is_featured")
    private Boolean isFeatured = false;
    
    // Operating hours
    @Size(max = 500, message = "Operating hours must not exceed 500 characters")
    @Column(name = "operating_hours", length = 500)
    private String operatingHours;
    
    // Social media links
    @Column(name = "facebook_url", length = 500)
    private String facebookUrl;
    
    @Column(name = "instagram_url", length = 500)
    private String instagramUrl;
    
    @Column(name = "twitter_url", length = 500)
    private String twitterUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private BrandStatus status = BrandStatus.ACTIVE;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Brand() {}
    
    public Brand(String name, String description, BrandType brandType) {
        this.name = name;
        this.description = description;
        this.brandType = brandType;
    }
    
    // Business Methods
    public void updateRating(Double newRating) {
        if (newRating != null && newRating >= 0.0 && newRating <= 5.0) {
            this.rating = newRating;
            if (this.reviewCount == null) {
                this.reviewCount = 1;
            } else {
                this.reviewCount++;
            }
        }
    }
    
    public boolean isShop() {
        return brandType == BrandType.SHOP;
    }
    
    public boolean isBrand() {
        return brandType == BrandType.BRAND;
    }
    
    public String getFullAddress() {
        StringBuilder fullAddress = new StringBuilder();
        if (address != null && !address.trim().isEmpty()) {
            fullAddress.append(address);
        }
        if (city != null && !city.trim().isEmpty()) {
            if (fullAddress.length() > 0) fullAddress.append(", ");
            fullAddress.append(city);
        }
        if (state != null && !state.trim().isEmpty()) {
            if (fullAddress.length() > 0) fullAddress.append(", ");
            fullAddress.append(state);
        }
        if (zipCode != null && !zipCode.trim().isEmpty()) {
            if (fullAddress.length() > 0) fullAddress.append(" - ");
            fullAddress.append(zipCode);
        }
        if (country != null && !country.trim().isEmpty()) {
            if (fullAddress.length() > 0) fullAddress.append(", ");
            fullAddress.append(country);
        }
        return fullAddress.toString();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    
    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }
    
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    
    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }
    
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    
    public BrandType getBrandType() { return brandType; }
    public void setBrandType(BrandType brandType) { this.brandType = brandType; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    
    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }
    
    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
    
    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }
    
    public String getFacebookUrl() { return facebookUrl; }
    public void setFacebookUrl(String facebookUrl) { this.facebookUrl = facebookUrl; }
    
    public String getInstagramUrl() { return instagramUrl; }
    public void setInstagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; }
    
    public String getTwitterUrl() { return twitterUrl; }
    public void setTwitterUrl(String twitterUrl) { this.twitterUrl = twitterUrl; }
    
    public BrandStatus getStatus() { return status; }
    public void setStatus(BrandStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}