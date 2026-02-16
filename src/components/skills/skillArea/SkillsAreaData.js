class SkillInfo 
{
    constructor(titleId, imageSrc, imageAlt, descId) 
    {
        this.titleId = titleId;
        this.imageSrc = imageSrc;
        this.imageAlt = imageAlt;
        this.descId = descId;
    }
}

const skillsAreaData = 
[
    {
        titleId: "Cat1",
        infos: [
            new SkillInfo("UE", "resources/icons/iconUnreal.png", "Unreal icon", "UEDsc"), 
            new SkillInfo("Unity", "resources/icons/iconUnity.png", "Unity icon", "UnityDsc"), 
            new SkillInfo("AI", "resources/icons/iconAI.png", "AI icon", "AIDsc"), 
            new SkillInfo("ML", "resources/icons/MachineLearningIcon.png", "Machine Learning icon", "MLDsc"),
            new SkillInfo("Tools", "resources/icons/iconTools.png", "Tools icon", "ToolsDsc"), 
            new SkillInfo("Mgmt", "resources/icons/iconGestionProjet.png", "Project Management icon", "MgmtDsc"),
            new SkillInfo("Canva", "resources/icons/CanvaIcon.png", "Canva icon", "CanvaDsc"),
            new SkillInfo("Miro", "resources/icons/MiroIcon.png", "Miro icon", "MiroDsc"), 
            new SkillInfo("Trello", "resources/icons/TrelloIcon.png", "Trello icon", "TrelloDsc"), 
            new SkillInfo("SKLearn", "resources/icons/SKLearnIcon.png", "Sci-Kit learn icon", "SKLearnDsc"), 
            new SkillInfo("FR", "resources/icons/iconFlagFR.jpg", "french flag icon", "FRDsc")
        ]
    },
    {
        titleId: "Cat2",
        infos: [
            new SkillInfo("BC", "resources/icons/BlockchainIcon.png", "Blockchain icon", "BCDsc"), 
            new SkillInfo("HH", "resources/icons/HardhatIcon.png", "Hardhat icon", "HHDsc"), 
            new SkillInfo("CU", "resources/icons/ClickUpIcon.png", "ClickUp icon", "CUDsc"), 
            new SkillInfo("HLSL", "resources/icons/HLSLIcon.png", "HLSL icon", "HLSLDsc"), 
            new SkillInfo("UML", "resources/icons/iconStarUML.png", "StarUML icon", "UMLDsc"),
            new SkillInfo("3C", "resources/icons/icon3C.png", "3C icon", "3CDsc"), 
            new SkillInfo("Android", "resources/icons/iconAndroid.png", "Android icon", "AndroidDsc"), 
            new SkillInfo("UI", "resources/icons/iconUI.png", "UI icon", "UIDsc"), 
            new SkillInfo("EN", "resources/icons/iconFlagEN.jpg", "English flag icon", "ENDsc")
        ]
    },
    {
        titleId: "Cat3",
        infos: [
            new SkillInfo("AR", "resources/icons/iconARCore.png", "ARCore icon", "ARDsc"),
            new SkillInfo("VR", "resources/icons/iconVR.png", "VR icon", "VRDsc"), 
            new SkillInfo("Blender", "resources/icons/iconBlender.png", "Blender icon", "BlenderDsc"), 
            new SkillInfo("PS", "resources/icons/PhotoshopIcon.png", "Photoshop icon", "PSDsc"),
            new SkillInfo("PM", "resources/icons/PostmanIcon.png", "Postman icon", "PMDsc"), 
            new SkillInfo("Web", "resources/icons/iconWeb.png", "Web icon", "WebDsc"), 
            new SkillInfo("DE", "resources/icons/iconFlagDE.png", "Deutsch flag icon", "DEDsc")
        ]
    }
];

export default skillsAreaData;