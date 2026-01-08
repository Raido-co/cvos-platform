"""
PDF Generator for cvOS
Version: 2.1.0 (2026-01-08)
Uses WeasyPrint 60+ API with write_pdf() returning bytes
"""
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("pdf_generator")

class PDFGenerator:
    """Generate CV PDFs from structured data using WeasyPrint."""
    
    VERSION = "2.1.0"
    
    def __init__(self, template_dir: str = "templates"):
        logger.info(f"Initializing PDFGenerator v{self.VERSION}")
        base_dir = os.path.dirname(os.path.abspath(__file__))
        template_path = os.path.join(base_dir, template_dir)
        logger.info(f"Template path: {template_path}")
        self.env = Environment(loader=FileSystemLoader(template_path))

    def generate_cv(self, data: dict, output_path: str) -> str:
        """
        Genera un PDF basado en data y el template 'cv_template.html'.
        Compatible con WeasyPrint 60+
        
        Args:
            data: Dictionary with CV fields (fullName, title, etc.)
            output_path: Path to save the generated PDF
            
        Returns:
            The output_path on success
        """
        logger.info(f"Generating CV for: {data.get('fullName', 'unknown')}")
        
        # Render HTML template
        template = self.env.get_template("cv_template.html")
        html_content = template.render(data=data)
        logger.info("Template rendered successfully")
        
        # Generate PDF using WeasyPrint 60+ API
        # write_pdf() without arguments returns bytes
        logger.info("Creating HTML document...")
        html_doc = HTML(string=html_content)
        
        logger.info("Generating PDF bytes...")
        pdf_bytes = html_doc.write_pdf()  # Returns bytes in WeasyPrint 60+
        
        logger.info(f"PDF generated: {len(pdf_bytes)} bytes")
        
        # Write bytes to file
        with open(output_path, 'wb') as f:
            f.write(pdf_bytes)
        
        logger.info(f"PDF saved to: {output_path}")
        return output_path


# Quick self-test
if __name__ == "__main__":
    print(f"PDFGenerator Version: {PDFGenerator.VERSION}")
    gen = PDFGenerator()
    test_data = {
        "fullName": "Test User",
        "title": "Developer",
        "email": "test@example.com",
        "summary": "Test summary",
        "experience": [],
        "education": [],
        "skills": "Python",
        "languages": "English",
        "certifications": []
    }
    gen.generate_cv(test_data, "/tmp/self_test.pdf")
    print("Self-test passed!")
