// Donation model schema-
// donationAmount
// Type: Int
// Required: true
// anonymousCheck
// Type: boolean
// stripePaymentInfo 
// Need to research how Stripe payment gets added in, what info needs to pass back and forth between our site and Stripe
// commentBody
// Type: string
// Required: false
// Maxlength: 280
// firstName/lastName or username (if anonymous checked, do not list)
// Type: String
// Required: true (unless anonymous is checked, then override with “anonymous”)
// createdAt
// Type: Date
// Default: Date.now
// Get: timestamp => dateFormat(timestamp)


