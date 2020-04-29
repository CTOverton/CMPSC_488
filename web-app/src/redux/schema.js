const dbSchema = {
    events: { // Collection
        eventID: { // Doc
            createdAt: "Timestamp", // Field
            createdBy: "userID", // Field
            author: { // Field
                username: "templateuser", // Value
                displayName: "Full Name" // Value
            },
            description: "Event Description", // Field
            title: "Event Title", // Field
            tags: ["Tag 1", "Tag 2"], // Field
            lists: { // Collection
                listID: { // Doc
                    name: "List Name", //Field
                    members: { // Collection
                        memberID: { // Doc
                            createdAt: "Timestamp", // Field
                            createdBy: "userID", // Field
                            author: { // Field
                                username: "templateuser", // Value
                                displayName: "Full Name" // Value
                            },
                            email: "example@domain.com", // Field
                            displayName: "Full Name",
                            uid: null, // Field
                            details: { // Field
                                fName: "",
                                lName: ""
                            },
                            tags: ["Tag 1"], // Field
                        }
                    },
                }
            },
            comments: { // Collection
                commentID: { // Doc
                    createdAt: "Timestamp", // Field | System timestamp for when event was created
                    createdBy: "userID", // Field | User id of user who created the event
                    content: "Comment Body" // Field
                }
            },
        }
    },

    users: { // Collection
        userID: { // Doc
            email: "example@domain.com", // Field
            username: "templateuser",
            displayName: "Full Name",
            details: { // Field
                fName: "", // Value
                lName: "" // Value
            },
            role: "admin", // Field
            attending: { // Collection
                eventID: { // Doc
                    eventID: "eventID"
                }
            }
        }
    }
};