from weasyprint import HTML
from jinja2 import Environment, FileSystemLoader
import os

class PDFGenerator:
    def __init__(self, template_dir="templates"):
        self.env = Environment(loader=FileSystemLoader(template_dir))

    def generate_cv(self, data: dict, output_path: str):
        """
        Genera un PDF basado en data y el template 'cv_template.html'.
        """
        template = self.env.get_template("cv_template.html")
        html_content = template.render(data=data)
        
        # Generar PDF
        HTML(string=html_content).write_pdf(output_path)
        return output_path

# Ejemplo de uso:
if __name__ == "__main__":
    generator = PDFGenerator()
    sample_data = {
        "name": "William Quintero",
        "title": "Cloud DevOps Engineer",
        "email": "iwillraido@gmail.com",
        "summary": "Ingeniero Cloud experimentado...",
        "experience": [
            {"company": "CleverIT", "role": "Cloud DevSecOps", "year": "2024-Present"}
        ]
    }
    # generator.generate_cv(sample_data, "output.pdf")
