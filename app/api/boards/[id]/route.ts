import Board from "@/models/board";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, {params}) {
    const {id} = params;
    const {name, description} = await request.json();
    await connectMongoDB();
    await Board.findByIdAndUpdate(id, {name, description });
    return NextResponse.json({ message : "Board updated" }, {status: 200 });
}

export async function GET(request, { params }) {
    const {id} = params;
    await connectMongoDB();
    const board = await Board.findOne({_id: id});
    return NextResponse.json({board}, {status: 200})
}