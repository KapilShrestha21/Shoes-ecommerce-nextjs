CREATE TABLE "delivery_persons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone" varchar(14) NOT NULL,
	"warehouse_id" integer,
	"order_id" integer
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delivery_persons" ADD CONSTRAINT "delivery_persons_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;