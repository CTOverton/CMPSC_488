const dbSchema = {
  events: { // Collection
    eventID: { // Doc
      createdAt: "Timestamp", // Field | System timestamp for when event was created
      createdBy: "uid", // Field | User id of user who created the event
      description: "Event Description", // Field
      title: "Event Title", // Field
    }
  },

  eventMembers: { // Collection
    eventID: { // Doc
      members: { // Field
        memberID1: true, // Value
        memberID2: true // Value
      }
    }
  },

  eventTags: { // Collection
    eventID: { // Doc
      tags: { // Field
        tagID1: true, // Value
        tagID2: true, // Value
      }
    }
  },

  eventSettings: { // Collection
    eventID: { // Doc
      settings: { // Field
        setting1: true, // Value
        setting2: true, // Value
      }
    }
  },

  members: { // Collection
    memberID: { // Doc
      email: "example@domain.com", // Field
      uid: null, // Field | User id if member is a user
      details: { // Field
        fName: "",
        lName: ""
      }
    }
  },

  tags: { // Collection
    tagID: { // Doc
      createdAt: "Timestamp", // Field | System timestamp for when event was created
      createdBy: "uid", // Field | User id of user who created the event
      name: "", // Field
      type: "default", // Field | default: shows as tags on members, list: shows as lists of members
      members: { // Field
        memberID1: true, // Value
        memberID2: true // Value
      }
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