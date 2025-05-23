const users = [
    {
        id: 1,
        isAdmin: false,
        email: "user@gmail.com",
        password: "12345678"
    },
    {
        id: 2,
        isAdmin: true,
        email: "admin@gmail.com",
        password: "12345678"
    },
    {
        id: 3,
        isAdmin: false,
        email: "user2@gmail.com",
        password: "12345678"
    }
]

export const forms = [
    [
        {
            "field": "Name",
            "type": "text"
        },
        {
            "field": "Rating",
            "type": "rating"
        }
    ],
    [
        {
            "field": "Name",
            "type": "text"
        },
        {
            "field": "Rating",
            "type": "rating"
        },
        {
            "field": "Satisfactory",
            "type": "checkbox"
        }
    ],
    [
        {
            "field": "Name",
            "type": "text"
        },
        {
            "field": "Rating",
            "type": "rating"
        },
        {
            "field": "Satisfactory",
            "type": "checkbox"
        },
        {
            "field": "Note",
            "type": "textInput"
        }
    ]
]

export const loginUser = (email, password) => {
    // Find the user with the matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    // If user is found, return success message with user details
    if (user) {
        return {
            success: true,
            user: {
                id: user.id,
                isAdmin: user.isAdmin,
                email: user.email
            }
        };
    } else {
        // If no user is found, return error message
        return {
            success: false,
        };
    }
};

export const getFormData = (id) => {
    const forms = JSON.parse(localStorage.getItem("FORMS"))
    return forms[id-1];
}