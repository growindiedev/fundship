import CategoryComponent from "../components/CategoryComponent";
import { useEffect, useState, useContext } from "react";
import dummyPic from "../assets/pg1.jpg";
import Link from "next/link";
import { AccountContext } from "../context";

export default function DiscoverComponent({ selected }) {
  const { contract, userAddress } = useContext(AccountContext);

  //const [filter, setFilter] = useState(selected >= 0 ? selected : -1);
  const [filter, setFilter] = useState(selected);
  const [projects, setProjects] = useState([]);
  const changeFilter = (val) => {
    setFilter(val);
  };

  const getAllProjects = async () => {
    try {
      let res = await contract.getAllProjectsDetail().then((res) => {
        let tmp = [];
        for (const index in res) {
          let {
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
            category,
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
            category,
          });
        }
        return tmp;
      });

      if (filter !== -1) {
        let tmp = [];
        for (const index in res) {
          if (res[index].category === filter) {
            tmp.push(res[index]);
          }
        }
        res = tmp;
      }

      setProjects(res);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  const renderCards = () => {
    return projects.map((project, index) => {
      return (
        <Link
          href={{
            pathname: "/project",
            query: { index: project.index },
          }}
          key={index}
        >
          <a>
            <div className="projectCardWrapper">
              <div className="projectCard">
                <div
                  className="cardImg"
                  style={{
                    backgroundImage: project.cid
                      ? `url(${"https://" + project.cid})`
                      : dummyPic,
                  }}
                ></div>
                <div className="cardDetail">
                  <div className="cardTitle">{project.projectName}</div>
                  <div className="cardDesc">{project.projectDescription}</div>
                  <div className="cardAuthor">{project.creatorName}</div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      );
    });
  };

  useEffect(() => {
    getAllProjects();
  }, [filter]);

  return (
    <>
      <CategoryComponent
        filter={filter}
        changeCategory={(val) => changeFilter(val)}
      />
      <div className="discoverHeading">Discover</div>
      <div className="discoverContainer">
        {projects.length !== 0 ? (
          renderCards()
        ) : (
          <div className="noProjects">No projects found</div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { selected = -1 } = query;
  //let filtered = selected >= 0 ? selected : -1;

  return {
    props: { selected },
  };
}
