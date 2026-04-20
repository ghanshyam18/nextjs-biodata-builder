import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { A4_HEIGHT_MM, A4_HEIGHT_PX, A4_WIDTH_MM, A4_WIDTH_PX } from '../constants/dimensions';

/**
 * Enterprise-grade PDF export utility.
 * This implementation uses the "Best-in-Class" configuration for html2canvas + jsPDF:
 * - 3x Scaling for Print-Grade DPI (approx 300 DPI equivalent)
 * - Lossless PNG capture for crystal clear text
 * - Precise A4 pixel-to-mm mapping
 * - Font-readiness detection to prevent fallback font capture
 */
export async function exportToPDF(
  element: HTMLElement,
  filename: string = 'Biodata.pdf'
): Promise<void> {
  try {
    // Ensure all fonts are fully loaded before capturing
    if (typeof document !== 'undefined' && 'fonts' in document) {
      await document.fonts.ready;
    }

    // 1. Capture with optimized settings
    const canvas = await html2canvas(element, {
      scale: 3, // 300 DPI equivalent (3x 96)
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      width: A4_WIDTH_PX,
      height: A4_HEIGHT_PX,
      windowWidth: A4_WIDTH_PX,
      windowHeight: A4_HEIGHT_PX,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 15000,
      removeContainer: true,
    });

    // 2. Use PNG for lossless clarity (JPEG adds artifacts around text)
    const imgData = canvas.toDataURL('image/png');

    // 3. Initialize jsPDF with exact A4 specs
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true, // Compress the underlying image in the PDF stream
    });

    // 4. Add image with zero margins to fill the page
    pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);

    // 5. Save the file
    pdf.save(filename);
  } catch (error) {
    console.error('High-Res PDF Export Failed:', error);
    throw error;
  }
}
