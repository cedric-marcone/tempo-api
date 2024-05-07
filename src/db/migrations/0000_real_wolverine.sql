CREATE TABLE `entries` (
	`id` integer PRIMARY KEY NOT NULL,
	`rule` text NOT NULL,
	`events_id` integer NOT NULL,
	FOREIGN KEY (`events_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `entries_exclusions` (
	`id` integer PRIMARY KEY NOT NULL,
	`entries_id` integer NOT NULL,
	`original_date` text NOT NULL,
	`date` text NOT NULL,
	FOREIGN KEY (`entries_id`) REFERENCES `entries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text(256) NOT NULL,
	`kind` text,
	`blob` text NOT NULL
);
