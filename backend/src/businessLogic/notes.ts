import * as uuid from 'uuid'
import { NotesAccess } from "../dataLayer/notesAccess";
import { Note } from "../models/Note";
import { CreateNoteRequest } from "../requests/CreateNoteRequest";
import { UpdateNoteRequest } from '../requests/UpdateNoteRequest';

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

export async function getUserNotes(userId: string): Promise<Note[]> {
  return notesAccess.getUserNotes(userId)
}

export async function updateNote(itemId: string, userId: string, data: UpdateNoteRequest) {
  return notesAccess.updateNote(itemId, userId, data)
}

export async function deleteNote(itemId: string, userId: string) {
  return notesAccess.deleteNote(itemId, userId)
}

export async function setAttachmentUrl(itemId: string, userId: string, attachmentUrl: string): Promise<void> {
  return notesAccess.setAttachmentUrl(itemId, userId, attachmentUrl)
}