const FetchData = async (id: string , name:string) => {
    try {
       console.log(id);
        const url = "https://leetwars-server-git-main-koushiks-projects-37ba14e7.vercel.app";
        const profile = await fetch(`${url}/userProfile/${id}`);
        if (!profile.ok) {
            const errorText = await profile.text(); // Get the response body as text
            console.error("Error fetching profile:", errorText);
            throw new Error(`Profile fetch failed with status: ${profile.status}`);
        }
        
        const profiledata = await profile.json();

        const skillstats = await fetch(`${url}/skillstats/${id}`);
        if (!skillstats.ok) {
            const errorText = await skillstats.text();
            console.error("Error fetching skill stats:", errorText);
            throw new Error(`Skill stats fetch failed with status: ${skillstats.status}`);
        }
        const skillstatsdata = await skillstats.json();

        const languagestats = await fetch(`${url}/languageStats?username=${id}`);
        if (!languagestats.ok) {
            const errorText = await languagestats.text();
            console.error("Error fetching language stats:", errorText);
            throw new Error(`Language stats fetch failed with status: ${languagestats.status}`);
        }
        const languagestatsdata = await languagestats.json();

        const badges = await fetch(`${url}/${id}/badges`);
        if (!badges.ok) {
            const errorText = await badges.text();
            console.error("Error fetching badges:", errorText);
            throw new Error(`Badges fetch failed with status: ${badges.status}`);
        }
        const badgesdata = await badges.json();
        const responsedata={
          name,
          id,
          ranking:profiledata.ranking,
          problems_solved:{
            total:profiledata.totalSolved,
            easy:profiledata.easySolved,
            medium :profiledata.mediumSolved,
            hard:profiledata.hardSolved,
            easy_total:profiledata.totalEasy,
            med_total:profiledata.totalMediun,
            hard_total:profiledata.totalHard,
          },
          skills:{
            advanced:skillstatsdata.data.matchedUser.tagProblemCounts.advanced,
            intermidiate:skillstatsdata.data.matchedUser.tagProblemCounts.intermediate,
            fundamental:skillstatsdata.data.matchedUser.tagProblemCounts.fundamental
          },
          calender:profiledata.submissionCalendar,
          languages:languagestatsdata.matchedUser.languageProblemCount,
          badges:badgesdata.badges
        }
        return responsedata;
    } catch (error) {
        console.error("Error validating LeetCode ID:", error);
        return { errors: true, message: "Network or server error" }; // Standard error structure
    }
};

export default FetchData;