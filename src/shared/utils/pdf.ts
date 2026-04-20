import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { A4_HEIGHT_MM, A4_WIDTH_MM } from '../constants/dimensions';

/**
 * High-fidelity PDF export utility using html2canvas and jsPDF.
 * This strategy renders the DOM to a canvas and then converts it to a PDF file,
 * ensuring consistency across mobile and desktop devices.
 */
export async function exportToPDF(
  element: HTMLElement,
  filename: string = 'Biodata.pdf'
): Promise<void> {
  try {
    // 1. Capture the element with high resolution
    const canvas = await html2canvas(element, {
      scale: 2, // 2x for Retina quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      // Ensure the capture captures the full height even if scrolled
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // 2. Initialize jsPDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // 3. Add the image to the PDF
    // We fit the image to the A4 page width
    pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, undefined, 'FAST');

    // 4. Trigger download
    pdf.save(filename);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
}
