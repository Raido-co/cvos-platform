"""
Tests for cvOS API - PDF Generation
Run with: python -m pytest test_api.py -v
"""
import pytest
import os
import sys

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_pdf_generator_imports():
    """Test that PDFGenerator can be imported."""
    from pdf_generator import PDFGenerator
    assert PDFGenerator is not None

def test_pdf_generator_init():
    """Test that PDFGenerator initializes correctly."""
    from pdf_generator import PDFGenerator
    gen = PDFGenerator()
    assert gen.env is not None

def test_template_exists():
    """Test that CV template exists."""
    template_path = os.path.join(
        os.path.dirname(__file__), 
        "templates", 
        "cv_template.html"
    )
    assert os.path.exists(template_path), f"Template not found at {template_path}"

def test_pdf_generation():
    """Test actual PDF generation."""
    from pdf_generator import PDFGenerator
    
    test_data = {
        "fullName": "Test User",
        "title": "Software Developer",
        "email": "test@example.com",
        "phone": "+1234567890",
        "location": "Remote",
        "summary": "Experienced developer with Python and JavaScript skills.",
        "experience": [
            {
                "company": "Tech Corp",
                "position": "Senior Developer",
                "location": "Remote",
                "startDate": "2020",
                "endDate": "Present",
                "description": "Led development of key features."
            }
        ],
        "education": [
            {
                "institution": "Tech University",
                "degree": "BS Computer Science",
                "startDate": "2016",
                "endDate": "2020",
                "location": "USA"
            }
        ],
        "skills": "Python, JavaScript, Docker, AWS",
        "languages": "English, Spanish",
        "certifications": []
    }
    
    gen = PDFGenerator()
    output_path = "/tmp/test_cv_output.pdf"
    
    # Generate PDF
    result = gen.generate_cv(test_data, output_path)
    
    # Verify file was created
    assert os.path.exists(output_path), "PDF file was not created"
    assert os.path.getsize(output_path) > 0, "PDF file is empty"
    
    # Cleanup
    os.remove(output_path)

def test_ats_analyzer():
    """Test ATS analyzer imports."""
    from ats_checker import ATSAnalyzer
    analyzer = ATSAnalyzer()
    assert analyzer is not None

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
