import { pdf } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { A4_HEIGHT_MM, A4_HEIGHT_PX, A4_WIDTH_MM, A4_WIDTH_PX } from '../constants/dimensions';
import { TraditionalPDF } from '../templates/pdf/TraditionalPDF';
import type { BiodataData, TemplateStyle } from '../types';

/**
 * Enterprise-grade PDF export utility.
 * Supports hybrid rendering:
 * 1. Native Selectable PDF: for templates converted to @react-pdf/renderer
 * 2. High-Res Image PDF: for legacy/complex CSS templates using capture
 */
export async function exportToPDF(
  element: HTMLElement,
  filename: string = 'Biodata.pdf',
  template?: TemplateStyle,
  data?: BiodataData
): Promise<void> {
  try {
    // NATIVE SELECTABLE PDF PATH (Target Architecture)
    if (template === 'traditional' && data) {
      try {
        const blob = await pdf(<TraditionalPDF data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      } catch (nativeError) {
        console.error('Native PDF rendering failed, falling back to capture method:', nativeError);
        // Fall through to legacy method below
      }
    }

    // LEGACY IMAGE-BASED PDF PATH (Standard Compatibility)
    // Ensure all fonts are fully loaded before capturing
    if (typeof document !== 'undefined' && 'fonts' in document) {
      await document.fonts.ready;
    }

    // 1. Capture with optimized settings
    const canvas = await html2canvas(element, {
      scale: 3, // 300 DPI equivalent
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

    const imgData = canvas.toDataURL('image/png');

    const pdfDoc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    pdfDoc.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
    pdfDoc.save(filename);
  } catch (error) {
    console.error('PDF Export Failed:', error);
    throw error;
  }
}
