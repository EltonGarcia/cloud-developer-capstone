import * as uuid from 'uuid'
import { NotesAccess } from "../dataLayer/notesAccess";
import { Note } from "../models/Note";
import { CreateNoteRequest } from "../requests/CreateNoteRequest";

const notesAccess = new NotesAccess()

export async function createNote(
    request: CreateNoteRequest,
    userId: string
  ): Promise<Note> {
  
    const itemId = uuid.v4()
  
    return await notesAccess.createNote({
        noteId: itemId,
        userId: userId,
        createdAt: new Date().toISOString(),
        title: request.title,
        content: request.content,
        favorite: request.favorite
    })
}
