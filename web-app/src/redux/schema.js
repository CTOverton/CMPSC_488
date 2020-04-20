const dbSchema = {
    events: { // Collection
        eventID: { // Doc
            createdAt: "Timestamp", // Field
            createdBy: "userID", // Field
            author: "username", // Field
            description: "Event Description", // Field
            title: "Event Title", // Field
            tags: [], // Field
            lists: { // Collection
                listID: { // Doc
                    members: { // Collection
                        memberID: { // Doc
                            email: "example@domain.com", // Field
                            uid: null, // Field
                            details: { // Field
                                fName: "",
                                lName: ""
                            },
                            tags: [], // Field
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
            username: "Full Name",
            details: { // Field
                fName: "", // Value
                lName: "" // Value
            },
            role: "admin", // Field
            events: {
                eventID: true
            }
        }
    }
};