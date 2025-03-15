let bookmarks = []; // in memory space
let currentId = 1;

export async function addBookmark(req,res,next){
// write here
    try {
        const { category, url } = req.body
        if(!category || !url) {
            return res.status(400).json({error: "Category and url are required"})
        }

        const newBookmark = { id: currentId++, category, url}
        bookmarks.push(newBookmark)
        return res.status(201).json(newBookmark)
    } catch (error) {
        return res.status(500).json({error: "An error occured while adding the bookmark"})
    }
}

export async function deleteBookmark(req,res,next){
// write here
    try{
        const { id } = req.params
        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id)
        if(!bookmarkIndex){
            return res.status(404).json({error: "Bookmarks not found"})
        }
        bookmarks.splice(bookmarkIndex, 1)
        return res.status(200).json({ message: "Bookmark deleted successfully"})
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while deleting the bookmark"})
    }
}

export async function getAllBookmarks(req,res,next){
// write here
    res.json(bookmarks)
}