import frappe
import json

@frappe.whitelist(allow_guest=True)
def send_contact_email():
    try:
        # Read the request JSON body
        data = json.loads(frappe.request.data)

        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return {"success": False, "error": "Missing required fields."}

        recipient_email = "simomutu8@gmail.com"
        subject = f"New Contact Form Submission from {name}"
        content = f"""
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Message:</strong> {message}</p>
        """

        frappe.sendmail(
            recipients=[recipient_email],
            subject=subject,
            message=content
        )
        
        return {"success": True, "message": "Email sent successfully."}

    except Exception as e:
        frappe.log_error(f"Email Sending Error: {str(e)}")
        return {"success": False, "error": str(e)}
