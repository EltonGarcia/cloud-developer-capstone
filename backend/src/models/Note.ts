export interface Note {
    userId: string
    noteId: string
    createdAt: string
    title: string
    content: string
    favorite: boolean
    attachmentUrl?: string
  }
