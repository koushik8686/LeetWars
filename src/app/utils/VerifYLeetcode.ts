const validateLeetCodeId = async (leetcodeUsername:string) => {
    try {
      const response = await fetch(`https://leetwars-server-git-main-koushiks-projects-37ba14e7.vercel.app/${leetcodeUsername}`);
      const data = await response.json();
      return data; // Return the response data for further use
    } catch (error) {
      console.error("Error validating LeetCode ID:", error);
      return { errors: true, message: "Network or server error" }; // Standard error structure
    }
  };
  
export default validateLeetCodeId