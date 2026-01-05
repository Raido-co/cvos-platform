from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
import os

class PDFGenerator:
    def __init__(self, template_dir="templates"):
        # Get the directory where this script is located
        base_dir = os.path.dirname(os.path.abspath(__file__))
        template_path = os.path.join(base_dir, template_dir)
        self.env = Environment(loader=FileSystemLoader(template_path))

    def generate_cv(self, data: dict, output_path: str):
        """
        Genera un PDF basado en data y el template 'cv_template.html'.
        Compatible con WeasyPrint 60+
        """
        template = self.env.get_template("cv_template.html")
        html_content = template.render(data=data)
        
        # Generar PDF - WeasyPrint 60+ returns bytes from write_pdf()
        html_doc = HTML(string=html_content)
        pdf_bytes = html_doc.write_pdf()
        
        # Escribir los bytes al archivo
        with open(output_path, 'wb') as f:
            f.write(pdf_bytes)
        
        return output_path

# Ejemplo de uso:
if __name__ == "__main__":
    generator = PDFGenerator()
    sample_data = {
        "fullName": "William Quintero",
        "title": "Cloud DevOps Engineer",
        "email": "iwillraido@gmail.com",
        "summary": "Ingeniero Cloud experimentado...",
        "experience": [],
        "education": [],
        "skills": "Python, GCP, AWS",
        "languages": "Spanish, English"
    }
    generator.generate_cv(sample_data, "test_output.pdf")
    print("PDF generated!")
