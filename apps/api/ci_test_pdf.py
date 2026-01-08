#!/usr/bin/env python3
"""
CI Test Script for cvOS PDF Generation
Run: python ci_test_pdf.py
"""
import sys
import os

# Add parent to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_pdf_generation():
    """Test that PDF generation works correctly."""
    from pdf_generator import PDFGenerator, TEMPLATES
    
    print(f"PDFGenerator Version: {PDFGenerator.VERSION}")
    print(f"Available templates: {list(TEMPLATES.keys())}")
    
    gen = PDFGenerator()
    
    test_data = {
        'fullName': 'CI Test User',
        'title': 'Software Developer',
        'email': 'ci@test.com',
        'summary': 'Experienced developer for CI testing.',
        'experience': [
            {
                'company': 'Test Corp',
                'position': 'Developer',
                'location': 'Remote',
                'startDate': '2020',
                'endDate': 'Present',
                'description': 'Testing functionality'
            }
        ],
        'education': [
            {
                'institution': 'Test University',
                'degree': 'BS Computer Science',
                'startDate': '2016',
                'endDate': '2020',
                'location': 'Remote'
            }
        ],
        'skills': 'Python, JavaScript, Docker',
        'languages': 'English, Spanish',
        'certifications': []
    }
    
    # Test each template
    for template_name in TEMPLATES.keys():
        output_file = f"/tmp/ci_test_{template_name}.pdf"
        gen.generate_cv(test_data, output_file, template=template_name)
        
        if os.path.exists(output_file):
            size = os.path.getsize(output_file)
            print(f"✅ {template_name}: Generated ({size} bytes)")
        else:
            print(f"❌ {template_name}: FAILED - File not created")
            return False
    
    print("\n✅ All PDF Generation Tests PASSED")
    return True

if __name__ == "__main__":
    success = test_pdf_generation()
    sys.exit(0 if success else 1)
