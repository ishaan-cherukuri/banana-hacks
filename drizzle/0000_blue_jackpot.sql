CREATE TABLE `registrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emergency_name` text NOT NULL,
	`emergency_phone` text NOT NULL,
	`workshops` text DEFAULT '[]' NOT NULL,
	`team_status` text NOT NULL,
	`experience` text NOT NULL,
	`project_idea` text,
	`role` text DEFAULT 'hacker' NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL
);
