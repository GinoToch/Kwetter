from selenium import webdriver
import time
from selenium.webdriver.common.by import By

# Function to extract storage data
def extract_storage_data(driver, storage_type):
    # Execute JavaScript to get all keys and values from storage
    return driver.execute_script(f"return JSON.stringify({storage_type})")

# Main function
def main():
    # Set up the WebDriver for your browser (make sure WebDriver is installed and in PATH)
    driver = webdriver.Chrome()  # Example: for Chrome
    
    try:
        # Navigate to your development server where your frontend is running
        driver.get('http://localhost:5173')  # Replace with your actual local development URL

        username_input = driver.find_element(By.ID, 'username-input')  # Replace with actual element ID
        password_input = driver.find_element(By.ID, 'password-input')  # Replace with actual element ID
        login_button = driver.find_element(By.ID, 'login-button')

        username_input.send_keys('semrester7')
        password_input.send_keys('semesrter7')
        login_button.click()
        # Wait a bit for everything to load
        time.sleep(4)

        # Extract sessionStorage
        session_data = extract_storage_data(driver, 'window.sessionStorage')

        # Extract localStorage
        local_data = extract_storage_data(driver, 'window.localStorage')

        # Print the extracted data
        print("Session Storage:")
        print(session_data)
        print("\nLocal Storage:")
        print(local_data)

    finally:
        # Close the WebDriver session
        driver.quit()

if __name__ == "__main__":
    main()
