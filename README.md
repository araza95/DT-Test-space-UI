# Development Task: Enhance SpaceX Launch Tracker

## Updated Folder Structure

```md
src/
├── components/
│   ├── LaunchCard/          # Each component gets its own folder
│   │   ├── index.js         # Main export
│   │   ├── LaunchCard.jsx   # Component logic
│   │   ├── LaunchCard.test.ts # Tests
│   │   └── styles.module.css # Component-specific styles
│   └── Pagination/
│       ├── index.js
│       ├── Pagination.jsx
│       ├── Pagination.test.ts
│       └── styles.module.css
├── hooks/                   # Custom hooks
│   └── useLaunches.js
├── lib/                     # Utility functions
│   └── api.js               # API service
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js             # Main page
├── styles/
│   ├── globals.css          # Global styles
│   └── theme.js             # Design tokens
└── test/                    # Test utilities
    └── setup.js
```

Product Request: Improve User Experience and Reliability
Background
Welcome! We have a small internal web application, the "SpaceX Launch Tracker," which was initially developed as a quick MVP to display upcoming and past SpaceX launches using a public API. It gained more internal traction than expected, and while it serves its basic purpose, its rapid development means it's lacking some key usability features and hasn't kept pace with our standard development practices.
Product Request
The Product Team has received feedback that as the number of launches grows, the current interface is becoming difficult to navigate. Furthermore, to ensure stability as we potentially expose this tool more widely, we need to increase confidence in its core functionality. Therefore, we need to address these points in the next iteration.
Your Tasks
We'd like you to work on the following enhancements. You have been provided with the current codebase for the tracker. Please focus on these specific tasks:

1. Implement Pagination: The current single-list view is becoming unwieldy. Please implement basic pagination controls (e.g., Previous/Next buttons, page numbers) to allow users to navigate through the launch history effectively.
2. Add Tests: To improve reliability, please introduce unit tests using Jest.
Focus on covering key components or logic you implement or modify (e.g., pagination logic, data display). Aim for basic but meaningful test coverage. 3. (Bonus) Improve UI Design: Users have commented that the interface feels dated. If you have time after completing the core tasks, feel free to improve the overall UI/UX design. This is open-ended but could include layout adjustments, styling enhancements (refactoring the existing CSS), improving visual hierarchy, or making the launch data easier to read.
Technical Notes
Time Estimate: Please aim to spend around 2 hours on this task. This includes familiarizing yourself with the existing code. Focus on implementing the core requirements cleanly.
Existing Code: Please integrate the required features into the provided codebase. You have the autonomy to modify the existing structure and logic as you see fit to best implement the requirements cleanly and effectively. Use your judgment on where modifications provide the most value for the tasks within the timeframe.
API: Assume the backend/API providing the launch data is fixed and cannot be changed.
Testing Framework: Please use Jest for any tests you add.
Submission

Please use Git for version control as you work on the assignment. When finished, share the project (e.g. via GitHub) or package the entire project directory (including the .git folder) into a single ZIP archive. Name the archive: YourName_SpaceX_Home_Assignment.zip . Send the GitHub link/ZIP file back to [Email address or contact person].
Good luck! We look forward to seeing your solution.

## API Response

```json
{"docs":[{"links":{"patch":{"small":"https://images2.imgbox.com/94/f2/NN6Ph45r_o.png","large":"https://images2.imgbox.com/5b/02/QcxHUb5V_o.png"},"reddit":{"campaign":null,"launch":null,"media":null,"recovery":null},"flickr":{"small":[],"original":[]},"presskit":null,"webcast":"https://www.youtube.com/watch?v=0a_00nJ_Y88","youtube_id":"0a_00nJ_Y88","article":"https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html","wikipedia":"https://en.wikipedia.org/wiki/DemoSat"},"success":false,"failures":[{"time":33,"altitude":null,"reason":"merlin engine failure"}],"details":"Engine failure at 33 seconds and loss of vehicle","name":"FalconSat","date_utc":"2006-03-24T22:30:00.000Z","upcoming":false,"id":"5eb87cd9ffd86e000604b32a"}],"totalDocs":205,"offset":0,"limit":1,"totalPages":205,"page":1,"pagingCounter":1,"hasPrevPage":false,"hasNextPage":true,"prevPage":null,"nextPage":2}
```
