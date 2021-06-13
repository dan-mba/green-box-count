import * as github from "@actions/github";

interface CalQuery {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        weeks: Array< {
          contributionDays: Array<{
            contributionCount: number
            date: string
          }>
        }>
      }
    }
  }
};

async function getSquaresCount(login: string, myToken: string) {
  const octokit = github.getOctokit(myToken);

  const query =
    `
      query getCal($login: String!){
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

  try {
    const request : CalQuery = await octokit.graphql(
      query,
      {
        "login": login
      }
    );

    const cal = request.user.contributionsCollection.contributionCalendar.weeks;
    const squares = cal.map(s => s.contributionDays).flat();

    let days = squares.map(s => {
      return {
        count: s.contributionCount,
        date: new Date(s.date.split('T')[0])
      }
    });

    days.sort((a, b) => Number(b.date) - Number(a.date));

    // Don't end streak based on current day, but add it if contribution made
    let count = days.slice(1).findIndex(d => d.count === 0);
    if (days[0].count > 0) count++;
    return count;
  } catch(e) {
    console.log('Call to GitHub GraphQL API failed');
    throw e;
  }
}

export default getSquaresCount;
