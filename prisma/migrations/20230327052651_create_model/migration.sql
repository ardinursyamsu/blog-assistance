-- CreateTable
CREATE TABLE "Category" (
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL PRIMARY KEY,
    "category_slug" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Post_category_slug_fkey" FOREIGN KEY ("category_slug") REFERENCES "Category" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");
