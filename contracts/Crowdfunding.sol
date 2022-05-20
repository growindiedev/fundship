pragma solidity >= 0.8.0 < 0.9.0;

contract Crowdfunding {

    enum Category {
      DESIGNANDTECH,
      FILM,
      ARTS,
      GAMES
    }

    // Refund policies 
    enum RefundPolicy {
        REFUNDABLE,
        NONREFUNDABLE
    }

    struct Project {
        string projectName;             
        string projectDescription;      
        string creatorName;             
        string projectLink;             
        string cid;                     
        uint256 fundingGoal;            
        uint256 duration;               
        uint256 creationTime;           
        uint256 amountRaised;           
        address creatorAddress;         
        Category category;                
        RefundPolicy refundPolicy;      
        address[] contributors;         // Stores the contributors of this project
        uint256[] amount;               // Stores the amount contributed by conrtibutors at corresponding index at contributors array
        bool[] refundClaimed;           // Keeps record if the contributors claimed refund at cooresponding index at contributors array
        bool claimedAmount;             // Keeps record if creator claimed raised funds
    }

    struct ProjectMetadata {
        string projectName;             
        string projectDescription;      
        string creatorName;             
        string cid;                     
        uint256 fundingGoal;            
        uint256 amountRaised;           
        uint256 totalContributors;      
        uint256 creationTime;           
        uint256 duration;               
        Category category;              
    }

    struct Funded {
      uint256 projectIndex;           // Stores the project index of project that's funded
      uint256 totalAmount;            // Stores the amount funded
    }

    Project[] projects;

    // Stores the indexes of projects created on projects list by an address
    mapping(address => uint256[]) addressProjectsList;

    // Stores the list of fundings  by an address
    mapping(address => Funded[]) addressFundingList;




} 