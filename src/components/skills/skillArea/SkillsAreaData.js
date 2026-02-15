class SkillInfo 
{
    constructor(titleIndex, imageSrc, imageAlt, descriptionIndex) 
    {
        this.titleIndex = titleIndex;
        this.imageSrc = imageSrc;
        this.imageAlt = imageAlt;
        this.descriptionIndex = descriptionIndex;
    }
}

const skillsAreaData = 
[
    {
        titleIndex: 0,
        infos: [
            new SkillInfo(1, "resources/icons/iconUnreal.png", "Unreal icon", 2), 
            new SkillInfo(3, "resources/icons/iconUnity.png", "Unity icon", 4), 
            new SkillInfo(5, "resources/icons/iconAI.png", "AI icon", 6), 
            new SkillInfo(11, "resources/icons/MachineLearningIcon.png", "Machine Learning icon", 12),
            new SkillInfo(7, "resources/icons/iconTools.png", "Tools icon", 8), 
            new SkillInfo(9, "resources/icons/iconGestionProjet.png", "Project Management icon", 10),
            new SkillInfo(35, "resources/icons/CanvaIcon.png", "Canva icon", 36),
            new SkillInfo(37, "resources/icons/MiroIcon.png", "Miro icon", 38), 
            new SkillInfo(39, "resources/icons/TrelloIcon.png", "Trello icon", 40), 
            new SkillInfo(41, "resources/icons/SKLearnIcon.png", "Sci-Kit learn icon", 42), 
            new SkillInfo(13, "resources/icons/iconFlagFR.jpg", "french flag icon", 14)
        ]
    },
    {
        titleIndex: 15,
        infos: [
            new SkillInfo(43, "resources/icons/BlockchainIcon.png", "Blockchain icon", 44), 
            new SkillInfo(45, "resources/icons/HardhatIcon.png", "Hardhat icon", 46), 
            new SkillInfo(47, "resources/icons/ClickUpIcon.png", "ClickUp icon", 48), 
            new SkillInfo(49, "resources/icons/HLSLIcon.png", "HLSL icon", 50), 
            new SkillInfo(51, "resources/icons/iconStarUML.png", "StarUML icon", 52),
            new SkillInfo(16, "resources/icons/icon3C.png", "3C icon", 17), 
            new SkillInfo(20, "resources/icons/iconAndroid.png", "Android icon", 21), 
            new SkillInfo(22, "resources/icons/iconUI.png", "UI icon", 23), 
            new SkillInfo(24, "resources/icons/iconFlagEN.jpg", "English flag icon", 25)
        ]
    },
    {
        titleIndex: 26,
        infos: [
            new SkillInfo(18, "resources/icons/iconARCore.png", "ARCore icon", 19),
            new SkillInfo(27, "resources/icons/iconVR.png", "VR icon", 28), 
            new SkillInfo(29, "resources/icons/iconBlender.png", "Blender icon", 30), 
            new SkillInfo(53, "resources/icons/PhotoshopIcon.png", "Photoshop icon", 54),
            new SkillInfo(55, "resources/icons/PostmanIcon.png", "Postman icon", 56), 
            new SkillInfo(31, "resources/icons/iconWeb.png", "Web icon", 32), 
            new SkillInfo(33, "resources/icons/iconFlagDE.png", "Deutsch flag icon", 34)
        ]
    }
];

export default skillsAreaData;