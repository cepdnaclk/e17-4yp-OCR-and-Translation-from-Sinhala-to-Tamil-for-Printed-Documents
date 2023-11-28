# Optical Character Recognition and Translation from Sinhala to Tamil for Printed Documents

---


#### Team

- E/17/122, Isthikar F.S., [email](mailto:e17122@eng.pdn.ac.lk)
- E/17/153, Karunachandra R.H.I.O., [email](mailto:e17153@eng.pdn.ac.lk)
- E/17/294, Rossmaree D.M., [email](mailto:e17294@eng.pdn.ac.lk)

#### Supervisors

- Prof. Roshan Ragel, [email](mailto:roshanr@eng.pdn.ac.lk)
- Dr. Asitha Bandaranayake, [email](mailto:asithab@eng.pdn.ac.lk)

#### Table of content

1. [Abstract](#abstract)
2. [Related works](#related-works)
3. [Methodology](#methodology)
4. [Experiment Setup and Implementation](#experiment-setup-and-implementation)
5. [Results and Analysis](#results-and-analysis)
6. [Conclusion](#conclusion)
7. [Publications](#publications)
8. [Links](#links)

## Abstract
Sinhala and Tamil are the official national languages of Sri Lanka. But most people only speak or read one of them, making a language barrier. This research aims to create an accessible tool to translate Sinhala documents into Tamil language. Optical Character Recognition (OCR) with the underlying technology of Tesseract is used to identify the characters from documents and using Google Translation API, translation is done. Pre-processing and post-processing techniques are used to improve the accuracy of the system.

## Related works
The area of Sinhala OCR and Sinhala to Tamil translation using different approaches has been touched on earlier by some significant research. However, there is a gap between existing research as there is no proper tool to do the document translations. Find the existing work [here]()


## Methodology

The main objective of this research is to develop a web application system that can convert printed Sinhala documents to Tamil using OCR for various file formats, such as images, documents, PDFs, and texts. This system is open to the public and free of charge. The system consists of 5 main components: Web portal(Input and Output module), preprocessing module, Tesseract OCR, postprocessing module, and Google translate module. Any user may upload a file (image/pdf/text/document) to the system using the web portal. The request is processed using the Restful API. Text and document file types feature editable text, instantly translated using Google Translate and displayed on the web portal. PDFs are first converted into images and then preprocessed using the module to enhance image quality. The main preprocessing techniques used are Binarization and Canny.

- **Binarization:** Converting an image into a binary image that is black and white, depending on a threshold.  
- **Canny:** A text recognition edge detection operator.

The Tesseract OCR extracts the text from the preprocessed images. For text cleaning, we utilized a postprocessing module that eliminates excess spaces, special characters, and other unneeded characters from the text. The Sinhala text is then translated into Tamil using Google Translate, a free Google API that provides highly accurate translations. The web portal displays the final output of the Tamil translation and the intermediate Sinhala OCR.

![Methodology](./images/methodology.png)

## Experiment Setup and Implementation

## Results and Analysis

## Conclusion
At the end of the research, we were able to develop a tool that is accessible to a diverse user base which enables the translation of Sinhala documents in different formats into editable Tamil texts thereby overcoming linguistic barriers. The system's optical character recognition (OCR) accuracy rate was 85%, and its translation accuracy rate was 77%. These were observed after utilizing pre-processing and post-processing techniques.

This tool may lead to further growth in future such as bringing out more reliability, accuracy and modification of the tool to support different other languages. As well as the research can be extended to overcome further related issues. A significant impact can be made in society through this as it allows people to get information and knowledge in their native language. It will interconnect the world and keep individuals informed and allied regardless of their linguistic aspects.

## Links
- [Project Repository](https://github.com/cepdnaclk/e17-4yp-OCR-and-Translation-from-Sinhala-to-Tamil-for-Printed-Documents)
- [Project Page](https://cepdnaclk.github.io/e17-4yp-OCR-and-Translation-from-Sinhala-to-Tamil-for-Printed-Documents/)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)
- [Download the Research Paper]()

