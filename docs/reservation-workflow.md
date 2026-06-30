# Reservation Workflow

## Goal

Convert Instagram and WhatsApp traffic into confirmed reservations.

## Flow

1. Customer sends WhatsApp message
2. AI asks for name, date, time, and guest count
3. System records request in Supabase
4. Staff confirms availability
5. Customer receives confirmation

## Required Fields

- customer_name
- phone
- reservation_date
- reservation_time
- guest_count
- special_request
- source
- status

## Status Values

- pending
- confirmed
- cancelled
- completed
- no_show
