
/*  const url="https://funky-dbkf.onrender.com" */
const url="http://localhost:3000"

const logo=document.querySelector(".logo")
logo.addEventListener("click",()=>{
    window.location.href="./index.html"
})

/* toogle code given here */
function toggleForm(formId) {
    const forms = document.querySelectorAll('.form-page');
    forms.forEach(form => {
        if (form.id === formId) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });
}

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('role').value || 'customer';

    // Check if all required fields are provided
    if (!email || !username || !password) {
        Swal.fire({
            title: 'Error!',
            text: 'Please provide all the fields',
            icon: 'error'
        });
        return;
    }

    // Prepare the request body
    const formData = {
        username: username,
        email: email,
        password: password,
        role: role
    };

    try {
        // Check for duplicate email and username
       
        const duplicateCheckResponse = await fetch(`${url}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const duplicateCheckData = await duplicateCheckResponse.json();

        if (duplicateCheckResponse.ok) {
            if (duplicateCheckData.message) {
                // Duplicate email or username found
                Swal.fire({
                    title: 'Error!',
                    text: 'This Email or Username is already taken.',
                    icon: 'error'
                });
            } else {
                // No duplicates found, registration successful
                Swal.fire({
                    title: 'Success!',
                    text: 'User has been registered successfully!',
                    icon: 'success'
                });
            }
        } else {
            // Registration failed
            Swal.fire({
                title: 'Error!',
                text: duplicateCheckData.error || 'An error occurred while processing your request.',
                icon: 'error'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while processing your request.',
            icon: 'error'
        });
    }
});



document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('role').value || 'customer';

    try {
        const response = await fetch(`${url}/user/login`, { // Corrected URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Login successful
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: data.msg,
                showConfirmButton: false,
                timer: 1500 // Automatically close the alert after 1.5 seconds
            })
            localStorage.setItem("token",JSON.stringify(data.accessToken))
              // Store tokens in cookies
            document.cookie = `access_token=${data.accessToken}; max-age=${15 * 60}`; // 15 minutes
            
            
            document.cookie = `refresh_token=${data.refreshToken}; max-age=${30 * 24 * 60 * 60}`; // 30 days

            // Check user role and redirect accordingly
            if (role === 'admin') {
                window.location.href = 'admin.html'; // Redirect to admin page
            } else {
                window.location.href = 'product.html'; // Redirect to index/customer page
            }
        } else {
            // Login failed
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: data.msg
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while processing your request. Please try again later.'
        });
    }
});


