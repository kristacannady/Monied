// Project model schema-
// projectTitle
// Type: string
// Required: ‘You need to give this project a name!”
// Minlength: 1
// Maxlength: to be determined
// OrganizationName
// Type: string
// Required: ‘You need to give the organization’s name!”
// Minlength: 1
// Maxlength: to be determined
// projectCategory
// Type: string
// Required: true
// projectDescription 
// Type: string
// Required: ‘You need to give a description!”
// Minlength: 1
// Maxlength: to be determined
// projectGoal
// Type: Int
// Required: true
// createdAt (may need to copy dateFormat.js util from Deep Thought module project)
// Type: Date
// Default: Date.now
// Get: timestamp => dateFormat(timestamp)
// firstName/lastName (or create a username option?)
// Donations: [donationSchema]? 
