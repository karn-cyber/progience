CREATE SCHEMA "app";
--> statement-breakpoint
CREATE TYPE "app"."capability" AS ENUM('workforce', 'digital_engineering', 'digital_trust', 'emerging_technology', 'application_support', 'quality_engineering');--> statement-breakpoint
CREATE TYPE "app"."enquiry_status" AS ENUM('new', 'qualifying', 'qualified', 'routed', 'contacted', 'disqualified', 'closed');--> statement-breakpoint
CREATE TYPE "app"."enquiry_type" AS ENUM('general', 'technology_capability', 'gcc', 'workforce', 'engineering', 'quality_trust', 'application_support', 'other');--> statement-breakpoint
CREATE TYPE "app"."notification_status" AS ENUM('pending', 'sent', 'failed');--> statement-breakpoint
CREATE TYPE "app"."solution" AS ENUM('build', 'scale', 'engineer', 'assure', 'operate', 'evolve');--> statement-breakpoint
CREATE TABLE "app"."careers_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"role_slug" text NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"resume_url" text,
	"linkedin_url" text,
	"cover_note" text,
	"status" text DEFAULT 'received' NOT NULL,
	"consent_privacy" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"enquiry_type" "app"."enquiry_type" NOT NULL,
	"source_context" text,
	"solution_interest" "app"."solution"[],
	"capability_interest" "app"."capability"[],
	"full_name" text NOT NULL,
	"work_email" text NOT NULL,
	"company" text,
	"job_title" text,
	"phone" text,
	"country" text,
	"message" text NOT NULL,
	"status" "app"."enquiry_status" DEFAULT 'new' NOT NULL,
	"consent_privacy" boolean DEFAULT false NOT NULL,
	"consent_marketing" boolean DEFAULT false NOT NULL,
	"consent_at" timestamp with time zone,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"referrer" text,
	"landing_page" text,
	"ip_hash" text,
	"user_agent" text,
	"is_spam" boolean DEFAULT false NOT NULL,
	"idempotency_key" text NOT NULL,
	CONSTRAINT "enquiries_idempotency_key_unique" UNIQUE("idempotency_key")
);
--> statement-breakpoint
CREATE TABLE "app"."enquiry_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enquiry_id" uuid NOT NULL,
	"event_type" text NOT NULL,
	"note" text,
	"actor" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."insight_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"confirmed_at" timestamp with time zone,
	"confirm_token" text,
	"unsubscribed_at" timestamp with time zone,
	"source" text,
	"consent_marketing" boolean DEFAULT true NOT NULL,
	CONSTRAINT "insight_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "app"."notification_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enquiry_id" uuid NOT NULL,
	"status" "app"."notification_status" DEFAULT 'pending' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"last_error" text,
	"next_attempt_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app"."rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"window_start" timestamp with time zone NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "app"."enquiry_events" ADD CONSTRAINT "enquiry_events_enquiry_id_enquiries_id_fk" FOREIGN KEY ("enquiry_id") REFERENCES "app"."enquiries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "app"."notification_jobs" ADD CONSTRAINT "notification_jobs_enquiry_id_enquiries_id_fk" FOREIGN KEY ("enquiry_id") REFERENCES "app"."enquiries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "enquiries_status_created_idx" ON "app"."enquiries" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "enquiries_type_idx" ON "app"."enquiries" USING btree ("enquiry_type");