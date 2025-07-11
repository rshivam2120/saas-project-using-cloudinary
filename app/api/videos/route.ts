import {NextRequest, NextResponse} from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

const prisma= new PrismaClient()

export async function GET(request:NextRequest) {
    try{
      const videos=  await prisma.video.findMany({
            orderBy:{createdat:"desc"}
        })
        return NextResponse.json(videos)
    } catch(error){
        return NextResponse.json({error:"error fetching videos"}, {status:500})
    }finally{
        await prisma.$disconnect()
    }
}
