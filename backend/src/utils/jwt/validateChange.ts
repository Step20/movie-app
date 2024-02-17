import Subsection from "../../models/Subsection"
import Page from "../../models/Page"
import Section from "../../models/Section"
import Site from "../../models/Site"
import validateUser from "./validateUser"
import LayoutElement from "../../models/LayoutElement"

type Args = {
    userId?:string
    layoutElementId?:string
    sectionId?:string
    subsectionId?:string
    pageId?:string
    siteId?:string
    token:string
}

const validateSubsection = async({subsectionId,token}:{subsectionId:string,token:string})=>{
    const subsection = await Subsection.findById(subsectionId)
    const sectionId = subsection?.section
    if(!sectionId){
        return false
    }
    const validated = await validateSection({sectionId,token})
    return validated
}

const validateSection = async({sectionId,token}:{sectionId:string,token:string})=>{
    const section = await Section.findById(sectionId)
    const pageId = section?.page
    if(!pageId){
        return false
    }
    const validated = await validatePage({pageId,token})
    return validated
}

const validatePage = async({pageId,token}:{pageId:string,token:string})=>{
    const page = await Page.findById(pageId)
    const siteId = page?.siteId?.toString()
    if(!siteId){
        return false
    }
    const validated = await validateSite({siteId,token})
    return validated
}


const validateSite = async({siteId,token}:{siteId:string,token:string})=>{
    const site = await Site.findById(siteId)
    const userId = site?.userId
    if(!userId){
        throw new Error("No site found")
    }
    const validated = await validateUser({userId,token})
    return validated
}

const validateLayoutElement = async({layoutElementId,token}:{layoutElementId:string,token:string})=>{
    const layoutElement = await LayoutElement.findById(layoutElementId)
    const siteId = layoutElement?.site
    if(!siteId){
        throw new Error("No site found")
    }
    const validated = await validateSite({siteId,token})
    return validated
}



const validateChange = async ({token,userId,siteId,pageId,sectionId,subsectionId,layoutElementId}: Args) => {
    if(process.env.REQUIRE_VALIDATION==='false'){
        return "validation not requrired in .env"
    }

    if(userId){
        await validateUser({userId,token})
        return
    }
    
    
    if(siteId){
        await validateSite({siteId,token})
        return
    }
    if(pageId){
        await validatePage({pageId,token})
        return
    }
    if(sectionId){
        await validateSection({sectionId,token})
        return
    }
    if(subsectionId){
        await validateSubsection({subsectionId,token})
        return
    }
    if(layoutElementId){
        await validateLayoutElement({layoutElementId,token})
        return
    }
    throw new Error("No doc id passed.")
}

export default validateChange