const Membership_levelENUM = Object.freeze({
    MEMBER: "member", // >= 0 và <5tr
    BRONZE: "bronze", // 5tr, giảm 6%
    SILVER: "silver", // >= 15tr, giảm 8%
    GOLD: "gold" // >=30tr, giảm 10%
 });
 
 module.exports = Membership_levelENUM;