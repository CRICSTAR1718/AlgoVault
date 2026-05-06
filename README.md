# AlgoVault

> **Track. Learn. Improve. Repeat.**

AlgoVault is a full-stack MERN web application designed to help developers track their algorithm and data structure practice, monitor progress, and level up their problem-solving skills over time.

🌐 **Live Demo:** [algo-vault-client.vercel.app](https://algo-vault-client.vercel.app)

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React.js, CSS                       |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB                             |
| Monorepo  | npm Workspaces + Concurrently       |
| Deployment| Vercel (client)                     |

---

## Project Structure

```
AlgoVault/
├── client/          # React frontend
├── server/          # Node.js + Express backend
├── package.json     # Root workspace config
└── .gitignore
```

---

## Running the App

### Run both client and server concurrently
```bash
npm run dev
```

### Run only the client
```bash
npm run dev:client
```

### Run only the server
```bash
npm run dev:server
```

### Build for production
```bash
npm run build
```

---

## Features

- 📋 **Problem Tracking** — Log and manage DSA problems you've solved
- 📈 **Progress Monitoring** — Visualize your learning journey over time
- 🗂️ **Organization** — Categorize problems by topic, difficulty, and status
- 🔄 **Revision Reminders** — Keep track of problems that need revisiting

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

This project is open source. See [LICENSE](LICENSE) for details.

---

<p align="center">Made with ❤️ by <a href="https://github.com/CRICSTAR1718">CRICSTAR1718</a></p>
