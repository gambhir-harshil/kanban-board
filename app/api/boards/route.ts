import Board, { IBoard } from "@/models/board"
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {name, description} = await request.json();
    await connectMongoDB();
    await Board.create({name, description});
    return NextResponse.json({message: "Board Created"}, {status: 201})
}

export async function GET() {
    await connectMongoDB();
    const boards = await Board.find();
    return NextResponse.json({boards})
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Board.findByIdAndDelete(id);
    return NextResponse.json({message: "Board Deleted"}, {status : 200})
}
