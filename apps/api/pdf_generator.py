"""
PDF Generator for cvOS
Version: 2.2.0 (2026-01-08)
Supports multiple templates: classic (free), modern (pro), executive (business)
"""
from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("pdf_generator")

# Available templates with their tier requirements
TEMPLATES = {
    "classic": {"file": "cv_classic.html", "tier": "free", "name": "Classic"},
    "modern": {"file": "cv_modern.html", "tier": "pro", "name": "Modern"},
    "executive": {"file": "cv_executive.html", "tier": "business", "name": "Executive"}
}

class PDFGenerator:
    """Generate CV PDFs from structured data using WeasyPrint."""
    
    VERSION = "2.2.0"
    
    def __init__(self, template_dir: str = "templates"):
        logger.info(f"Initializing PDFGenerator v{self.VERSION}")
        base_dir = os.path.dirname(os.path.abspath(__file__))
        template_path = os.path.join(base_dir, template_dir)
        self.env = Environment(loader=FileSystemLoader(template_path))
        self.template_path = template_path

    def get_available_templates(self) -> dict:
        """Return dict of available templates with metadata."""
        return TEMPLATES

    def generate_cv(self, data: dict, output_path: str, template: str = "classic") -> str:
        """
        Generate PDF from CV data using specified template.
        
        Args:
            data: Dictionary with CV fields (fullName, title, etc.)
            output_path: Path to save the generated PDF
            template: Template name ('classic', 'modern', 'executive')
            
        Returns:
            The output_path on success
        """
        # Validate template
        if template not in TEMPLATES:
            logger.warning(f"Unknown template '{template}', falling back to 'classic'")
            template = "classic"
        
        template_info = TEMPLATES[template]
        template_file = template_info["file"]
        
        logger.info(f"Generating CV for: {data.get('fullName', 'unknown')} using template: {template}")
        
        # Render HTML template
        tpl = self.env.get_template(template_file)
        html_content = tpl.render(data=data)
        logger.info(f"Template '{template_file}' rendered successfully")
        
        # Generate PDF
        html_doc = HTML(string=html_content, base_url=self.template_path)
        pdf_bytes = html_doc.write_pdf()
        
        logger.info(f"PDF generated: {len(pdf_bytes)} bytes")
        
        # Write to file
        with open(output_path, 'wb') as f:
            f.write(pdf_bytes)
        
        logger.info(f"PDF saved to: {output_path}")
        return output_path


if __name__ == "__main__":
    print(f"PDFGenerator Version: {PDFGenerator.VERSION}")
    print(f"Available templates: {list(TEMPLATES.keys())}")
    
    gen = PDFGenerator()
    test_data = {
        "fullName": "Test User",
        "title": "Developer",
        "email": "test@example.com",
        "summary": "Test summary",
        "experience": [],
        "education": [],
        "skills": "Python, JavaScript",
        "languages": "English, Spanish",
        "certifications": []
    }
    
    # Test each template
    for template_name in TEMPLATES.keys():
        output_file = f"/tmp/test_{template_name}.pdf"
        gen.generate_cv(test_data, output_file, template=template_name)
        print(f"✅ Generated: {output_file}")
