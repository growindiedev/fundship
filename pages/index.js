import { useEffect, useState, useContext } from "react";
import CategoryComponent from "../components/CategoryComponent";
import ScrollShowbarComponent from "../components/ScrollShowbarComponent";
import Link from "next/link";
import { AccountContext } from "../context";
import dummyPic from "../assets/pg1.jpg";

export default function Home() {
  const { contract } = useContext(AccountContext);

  const PRECISION = 10 ** 18;
  const [stats, setStats] = useState({
    projects: 0,
    fundings: 0,
    contributors: 0,
  });
  const [featuredRcmd, setFeaturedRcmd] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);

  const getAllProjects = async () => {
    try {
      let res = await contract.getAllProjectsDetail().then((res) => {
        let tmp = [];
        let amount = 0,
          contrib = 0;
        for (const index in res) {
          let {
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
          } = { ...res[index] };
          tmp.push({
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
            index,
          });
          amount += Number(amountRaised / PRECISION);
          contrib += Number(totalContributors);
        }
        setStats({
          projects: tmp.length,
          fundings: amount,
          contributors: contrib,
        });
        return tmp;
      });
      res.sort((a, b) => {
        return b.totalContributors * 1 - a.totalContributors * 1;
      });
      setFeaturedRcmd(res.slice(0, 4));
      setRecentUploads(res.slice(4, 24));
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const renderRecommendations = (val) => {
    return val.map((project, index) => {
      return (
        <div className="recommendationCard" key={index}>
          <Link
            href={{
              pathname: "/project",
              query: { index: project.index },
            }}
          >
            <a>
              <div
                className="rcmdCardImg"
                style={{
                  backgroundImage: project.cid
                    ? `url(${"https://" + project.cid})`
                    : dummyPic,
                }}
              ></div>
            </a>
          </Link>
          <div className="rcmdCardDetails">
            <div className="rcmdCardHeading">
              <Link
                href={{
                  pathname: "/project",
                  query: { index: project.index },
                }}
              >
                <a>{project.projectName}</a>
              </Link>
            </div>
            <div className="rcmdCardFundedPercentage">
              {((project.amountRaised / project.fundingGoal) * 100).toFixed(2) +
                "% Funded"}
            </div>
            <div className="rcmdCardAuthor">{"By " + project.creatorName}</div>
          </div>
        </div>
      );
    });
  };

  // useEffect(() => {
  //   getAllProjects();
  // }, [props.contract]);

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <CategoryComponent isHome={true} />
      {/* siteStats */}
      <div className="siteStats">
        <div className="tagLine">
          Finally, a decentralised crowdfunding platform
          <br></br>
          Join the movement
        </div>
        <div className="smallHeading">TILL THIS DAY</div>
        <div className="stats">
          <div className="statItem">
            <div className="statItemValue">{stats.projects}</div>
            <div className="statItemTag">projects </div>
          </div>
          <div className="statItem">
            <div className="statItemValue">{stats.fundings + " MATIC"}</div>
            <div className="statItemTag">towards creative work</div>
          </div>
          <div className="statItem">
            <div className="statItemValue">{stats.contributors}</div>
            <div className="statItemTag">backings</div>
          </div>
        </div>
      </div>

      {featuredRcmd.length !== 0 ? (
        <div className="suggestions">
          <div className="suggLeftContainer">
            <div className="featuredCard">
              <div className="featuredHeading">FEATURED PROJECT</div>
              <Link
                href={{
                  pathname: "/project",
                  query: { index: featuredRcmd[0].index },
                }}
              >
                <a>
                  <div
                    className="featuredCardProjectImg"
                    style={{
                      backgroundImage: featuredRcmd[0].cid
                        ? `url(${"https://" + featuredRcmd[0].cid})`
                        : dummyPic,
                    }}
                  ></div>
                </a>
              </Link>
              <div className="featuredProjectHeading">
                <Link
                  href={{
                    pathname: "/project",
                    query: { index: featuredRcmd[0].index },
                  }}
                >
                  <a>{featuredRcmd[0].projectName}</a>
                </Link>
              </div>
              <div className="featuredProjectDescription">
                {featuredRcmd[0].projectDescription}
              </div>
              <div className="featuredProjectAuthor">
                {"By " + featuredRcmd[0].creatorName}
              </div>
            </div>
          </div>
          <div className="suggRightContainer">
            <div className="recommendationList">
              <div className="recommendationHeading">RECOMMENDED FOR YOU</div>
              {renderRecommendations(featuredRcmd.slice(1, 4))}
            </div>
          </div>
        </div>
      ) : (
        <div className="noProjects">No projects found</div>
      )}
      <ScrollShowbarComponent
        recentUploads={recentUploads}
        heading={"RECENT UPLOADS"}
        emptyMessage={"No recent uploads"}
      />
    </>
  );
}
