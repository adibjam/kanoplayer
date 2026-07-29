# Kano Player Configuration Generator

An offline web-based generator for creating **KANO configuration files (.kano)** used by **Kano Player**.

The generator runs entirely in your browser. No data is uploaded to any server.

## Features

- ✅ Offline configuration generator
- ✅ Password-protected KANO files
- ✅ Public KANO files
- ✅ AES-256 encrypted configuration files
- ✅ Custom creator information
- ✅ Telegram channel/profile support
- ✅ Export to `.kano` format

---

# JSON Format

The generator accepts a JSON configuration in the following format.

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
