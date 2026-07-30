# Online KANO Configuration Generator

You can generate KANO configuration files directly from your browser.

### Online Generator

[https://adibjam.github.io/kanoplayer/]

The generator works entirely in your browser and does not require any software installation.

## How to Use

1. Open the online generator.
2. Paste your JSON configuration.
3. (Optional) Enter creator information and a Telegram username.
4. (Optional) Set a password to create a private configuration.
5. Click **Generate**.
6. Download the generated **.kano** file.

## Share Your Configuration

After generating the `.kano` file:

1. Upload the file to your own web server or any file hosting service that provides a direct download link.
2. Copy the direct URL of the uploaded `.kano` file.
3. Share the link with Kano Player users.

Example:

```text
https://example.com/config.kano
```

Users can import the configuration directly into Kano Player using this URL.

> **Note**
>
> Kano Player does not host configuration files. Configuration creators are responsible for uploading and maintaining their own `.kano` files.

---

# Sample JSON

```json
{
  "type": 0,
  "downloadable": false,
  "category": [
    "Category 1",
    "Category 2"
  ],
  "items": [
    {
      "category_position": [0],
      "title": "Title 1",
      "link": "https://example.com/video1.mp4"
    },
    {
      "category_position": [1],
      "title": "Title 2",
      "link": "https://example.com/video2.mp4"
    },
    {
      "category_position": [0, 1],
      "title": "Title 3",
      "link": "https://example.com/video3.mp4"
    }
  ]
}
```

---

# Configuration Fields

## type

Specifies the content type.

| Value | Description |
|-------:|-------------|
| 0 | Video |
| 1 | Audio |
| 2 | Other (Download) |

Example:

```json
"type": 0
```

---

## downloadable

Controls whether the player allows downloading of media files.

```json
"downloadable": true
```

or

```json
"downloadable": false
```

---

## category

Array of category names.

```json
"category": [
    "Movies",
    "Music",
    "Tutorials"
]
```

Category indexes start from **0**.

---

## items

Each media entry consists of:

| Field | Description |
|--------|-------------|
| category_position | Category index or indexes |
| title | Item title |
| link | Direct media URL |

Example:

```json
{
    "category_position": [0],
    "title": "Sample Video",
    "link": "https://example.com/video.mp4"
}
```

---

## category_position

An item may belong to one or multiple categories.

Single category:

```json
"category_position":[0]
```

Multiple categories:

```json
"category_position":[0,1]
```

---

## link

Must be a direct URL accessible by Kano Player.

Examples:

```text
https://example.com/movie.mp4
https://example.com/music.mp3
https://example.com/file.zip
```

---

# Password Protection

The generator supports two encryption modes.

### Public Configuration

Leave the password field empty.

The generated KANO file is encrypted using the application's built-in public key and can be opened automatically by Kano Player without asking the user for a password.

---

### Private Configuration

Enter a password during generation.

The user will be prompted to enter the same password before the configuration can be opened.

---

# Notes

- Only valid JSON is accepted.
- Media links should be direct URLs.
- Kano Player does not host any content.
- Configuration creators are responsible for the content they distribute.

---

# License

This project is provided for creating KANO configuration files compatible with Kano Player.
