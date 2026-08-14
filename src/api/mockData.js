export const MOCK_SEARCH_RESULTS = [
  {
    _id: 'PMC12345678',
    title: 'Deep learning for breast cancer detection in mammography: a systematic review and meta-analysis',
    abstract: 'Background: Breast cancer is the most common cancer among women worldwide. Early detection through mammography screening significantly reduces mortality. Deep learning algorithms have shown promise in improving the accuracy and efficiency of mammography interpretation. This systematic review and meta-analysis evaluates the performance of deep learning models for breast cancer detection in mammography images. Methods: We searched PubMed, Embase, and Cochrane databases for studies published between January 2015 and December 2023. Two independent reviewers screened titles, abstracts, and full texts. Data extraction included study characteristics, model architectures, and diagnostic performance metrics. Results: Twenty-three studies met inclusion criteria, encompassing 1.2 million mammography exams. The pooled sensitivity of deep learning models was 0.91 (95% CI: 0.88-0.93) and specificity was 0.86 (95% CI: 0.83-0.89). Convolutional neural networks, particularly ResNet and DenseNet architectures, demonstrated superior performance. Conclusion: Deep learning models achieve high sensitivity and specificity for breast cancer detection in mammography, comparable to or exceeding radiologist performance. Integration of these models into clinical workflows may improve screening outcomes and reduce radiologist workload.',
    mesh_terms: ['Breast Neoplasms', 'Deep Learning', 'Mammography', 'Neural Networks, Computer', 'Sensitivity and Specificity'],
    authors: ['Smith JD', 'Johnson AL', 'Williams RK', 'Brown LM', 'Davis MP'],
    journal: 'Radiology: Artificial Intelligence',
    pub_date: '2024-03-15',
    score: 0.94
  },
  {
    _id: 'PMC98765432',
    title: 'Machine learning approaches for type 2 diabetes prediction using electronic health records',
    abstract: 'Background: Type 2 diabetes mellitus (T2DM) is a growing global health concern. Early identification of at-risk individuals enables preventive interventions. Electronic health records (EHRs) contain rich longitudinal data suitable for machine learning-based risk prediction. Methods: We developed and validated multiple machine learning models using a retrospective cohort of 450,000 adults from a multi-center health system. Features included demographic data, laboratory values, vital signs, medication history, and diagnosis codes. We compared logistic regression, random forest, gradient boosting, and deep neural networks. Results: The gradient boosting model achieved the highest area under the receiver operating characteristic curve (AUC) of 0.89 (95% CI: 0.88-0.90), outperforming traditional risk scores including the Framingham Risk Score (AUC: 0.78). Important predictors included fasting glucose, HbA1c, body mass index, and family history. The model maintained good calibration across demographic subgroups. Conclusion: Machine learning models using EHR data can accurately predict T2DM risk. Implementation of such models in clinical decision support systems could facilitate early intervention and reduce diabetes incidence.',
    mesh_terms: ['Diabetes Mellitus, Type 2', 'Machine Learning', 'Electronic Health Records', 'Risk Factors', 'Predictive Value of Tests'],
    authors: ['Chen Y', 'Martinez R', 'Lee S', 'Patel N', 'Garcia A', 'Wilson T'],
    journal: 'Journal of Biomedical Informatics',
    pub_date: '2024-01-20',
    score: 0.91
  },
  {
    _id: 'PMC45678901',
    title: 'Transformer-based natural language processing for clinical note summarization: a multi-institutional study',
    abstract: 'Background: Clinical documentation burden contributes to physician burnout. Automatic summarization of clinical notes could improve efficiency. Recent transformer-based large language models (LLMs) have shown remarkable text generation capabilities. Methods: We evaluated BioBERT, PubMedBERT, and GPT-4 for generating discharge summaries from admission notes across three academic medical centers. We assessed summary quality using ROUGE scores, BERTScore, and a clinician rating scale. Results: PubMedBERT achieved the highest ROUGE-1 F1 score of 0.72, while GPT-4 generated the most clinically coherent summaries with an average clinician rating of 4.2/5. All models significantly reduced documentation time by an average of 3.2 minutes per note. Conclusion: Transformer-based LLMs can effectively summarize clinical notes. Further validation and integration into electronic health record systems are warranted.',
    mesh_terms: ['Natural Language Processing', 'Clinical Notes', 'Transformers', 'Physician Burnout', 'Medical Informatics'],
    authors: ['Anderson K', 'Thompson B', 'White C', 'Harris D', 'Clark E', 'Lewis P', 'Walker J'],
    journal: 'Journal of the American Medical Informatics Association',
    pub_date: '2023-11-08',
    score: 0.88
  },
  {
    _id: 'PMC11223344',
    title: 'Federated learning for privacy-preserving medical image analysis across hospitals',
    abstract: 'Background: Medical image analysis benefits from large diverse datasets, but data sharing across institutions is limited by privacy regulations. Federated learning enables model training without centralizing sensitive patient data. Methods: We conducted a federated learning study across 7 hospitals for chest X-ray pathology classification using a modified ResNet-50 architecture. We compared centralized training, local training, and federated averaging under various data heterogeneity conditions. Results: Federated learning achieved 98.2% of the performance of centralized training while maintaining patient data at local sites. Communication-efficient federated averaging reduced bandwidth requirements by 75% with minimal performance degradation. Conclusion: Federated learning is a viable approach for developing robust medical image analysis models while preserving patient privacy.',
    mesh_terms: ['Federated Learning', 'Medical Image Analysis', 'Privacy', 'Chest X-Ray', 'Data Sharing'],
    authors: ['Nguyen T', 'Kim J', 'Singh R', 'Muller A', 'Silva C'],
    journal: 'Nature Medicine',
    pub_date: '2024-05-22',
    score: 0.85
  },
  {
    _id: 'PMC55667788',
    title: 'Explainable AI in clinical decision support: a systematic review of methods and applications',
    abstract: 'Background: Black-box nature of deep learning models limits clinical adoption. Explainable AI (XAI) techniques aim to make model predictions interpretable to clinicians. Methods: We systematically reviewed XAI applications in clinical decision support from 2018 to 2024. We categorized XAI methods into feature attribution, example-based, and intrinsic approaches. Results: Fifty-seven studies met inclusion criteria. Feature attribution methods, particularly SHAP and LIME, were most commonly applied. XAI improved clinician trust and understanding but added computational overhead. Challenges included reconciling technical explanations with clinical reasoning. Conclusion: XAI is increasingly integrated into clinical AI systems. Standardized evaluation frameworks and clinician-centered design are needed.',
    mesh_terms: ['Explainable AI', 'Clinical Decision Support', 'Deep Learning', 'Interpretability', 'Artificial Intelligence'],
    authors: ['Roberts M', 'Taylor S', 'Moore L', 'Jackson R', 'Martin P', 'Lee K', 'Harris M'],
    journal: 'The Lancet Digital Health',
    pub_date: '2024-02-10',
    score: 0.82
  },
  {
    _id: 'PMC99887766',
    title: 'Retinal fundus imaging and deep learning for cardiovascular risk prediction: the UK Biobank study',
    abstract: 'Background: Retinal fundus images contain information about microvasculature that reflects systemic vascular health. Deep learning can extract features predictive of cardiovascular events. Methods: We trained a deep learning model on 80,000 retinal fundus images from UK Biobank to predict 10-year cardiovascular risk. We compared model predictions with established risk scores including Framingham and QRISK3. Results: The deep learning model achieved a C-index of 0.73 for major adverse cardiac events, comparable to QRISK3 (C-index: 0.72). The model additionally identified novel retinal biomarkers associated with hypertension and stroke. Conclusion: Retinal fundus imaging combined with deep learning provides a non-invasive tool for cardiovascular risk stratification.',
    mesh_terms: ['Retinal Diseases', 'Cardiovascular Diseases', 'Deep Learning', 'Risk Assessment', 'Fundus Photography'],
    authors: ['Poplin R', 'Varadarajan AV', 'Blumer K', 'Liu Y', 'McConnell MV', 'Peng J', 'Webster DR'],
    journal: 'Nature Biomedical Engineering',
    pub_date: '2023-09-14',
    score: 0.79
  },
  {
    _id: 'PMC33445566',
    title: 'Multimodal fusion of imaging and genomics for precision oncology treatment response prediction',
    abstract: 'Background: Cancer treatment response varies widely among patients. Integrating multiple data modalities may improve prediction accuracy. Methods: We developed a multimodal deep learning architecture fusing radiology imaging, pathology slides, and genomic profiles to predict response to neoadjuvant chemotherapy in breast cancer. Results: The multimodal model achieved an AUC of 0.87, significantly outperforming single-modality models (imaging AUC: 0.76, genomics AUC: 0.72). Attention maps highlighted tumor regions and gene expression patterns most predictive of response. Conclusion: Multimodal fusion shows promise for precision oncology. Prospective validation in clinical trials is ongoing.',
    mesh_terms: ['Precision Medicine', 'Oncology', 'Multimodal Imaging', 'Genomics', 'Treatment Response'],
    authors: ['Chen RJ', 'Lu MY', 'Chen TY', ' Williamson DFK', 'Sahm F', 'Iqbal AS'],
    journal: 'Cancer Cell',
    pub_date: '2024-04-05',
    score: 0.76
  },
  {
    _id: 'PMC77889900',
    title: 'Wearable sensor data and machine learning for continuous glucose monitoring in diabetes management',
    abstract: 'Background: Continuous glucose monitoring (CGM) improves glycemic control in diabetes. Wearable sensors generate high-frequency data streams amenable to machine learning analysis. Methods: We developed recurrent neural network models using CGM, heart rate, and physical activity data from 500 patients with type 1 diabetes over 12 weeks. The model predicted glucose levels 30 and 60 minutes ahead. Results: The model achieved mean absolute relative difference of 8.2% for 30-minute predictions and 12.5% for 60-minute predictions, meeting clinical accuracy standards. Hypoglycemia prediction sensitivity was 0.91. Conclusion: Machine learning on wearable sensor data enables accurate short-term glucose forecasting, potentially improving diabetes management through predictive alerts.',
    mesh_terms: ['Diabetes Mellitus', 'Glucose', 'Wearable Sensors', 'Recurrent Neural Networks', 'Predictive Analytics'],
    authors: ['Beamer B', 'Fang F', 'Li Z', 'Khan S', 'Ortiz A'],
    journal: 'Diabetes Care',
    pub_date: '2023-12-01',
    score: 0.73
  },
  {
    _id: 'PMC22334455',
    title: 'Large language models for biomedical question answering: benchmarks and limitations',
    abstract: 'Background: Large language models (LLMs) have shown general knowledge capabilities but their performance on domain-specific biomedical questions remains underexplored. Methods: We evaluated GPT-4, Claude 3, and PubMedBERT on MedQA, PubMedQA, and a new clinical vignette dataset. We assessed accuracy, reasoning quality, and citation accuracy. Results: GPT-4 achieved 72.4% accuracy on MedQA, outperforming PubMedBERT (58.1%). However, all models struggled with multi-hop reasoning and recent literature. Citation accuracy was only 34%, indicating hallucination concerns. Conclusion: LLMs show promise for biomedical question answering but require careful validation before clinical deployment. Domain-specific fine-tuning improves performance.',
    mesh_terms: ['Natural Language Processing', 'Question Answering', 'Large Language Models', 'Biomedical Research', 'Benchmarking'],
    authors: ['Singhal K', 'Tu T', ' Gottweis J', 'Sousa R', 'Sakumar N', 'Sayres R', 'Qasrawi B'],
    journal: 'npj Digital Medicine',
    pub_date: '2024-06-18',
    score: 0.70
  },
  {
    _id: 'PMC66778899',
    title: 'Graph neural networks for drug repurposing against infectious diseases: a COVID-19 case study',
    abstract: 'Background: Drug repurposing offers a faster path to therapeutics for emerging infectious diseases. Graph neural networks (GNNs) can model complex drug-target interactions. Methods: We constructed knowledge graphs integrating drug properties, protein structures, and disease associations. We trained a GNN to predict drug-disease associations and applied it to identify candidate repurposing drugs for COVID-19. Results: The model identified 12 candidate compounds, 3 of which showed antiviral activity in vitro. Remdesivir and dexamethasone were ranked among top predictions, validating the approach. Conclusion: GNN-based drug repurposing frameworks can accelerate therapeutic discovery for infectious diseases.',
    mesh_terms: ['Drug Repositioning', 'Graph Neural Networks', 'COVID-19', 'Antiviral Agents', 'Knowledge Graphs'],
    authors: ['Zitnik M', 'Agrawal M', 'Leskovec J', 'Xie L', 'Mohamed SK', 'Fung P'],
    journal: 'Nature Communications',
    pub_date: '2023-08-30',
    score: 0.67
  }
]

export const MOCK_MOST_VIEWED = [
  { _id: 'PMC12345678', title: 'Deep learning for breast cancer detection in mammography', journal: 'Radiology: AI', pub_date: '2024-03-15', view_count: 15420 },
  { _id: 'PMC98765432', title: 'Machine learning for type 2 diabetes prediction using EHR', journal: 'JBI', pub_date: '2024-01-20', view_count: 12350 },
  { _id: 'PMC45678901', title: 'Transformer-based NLP for clinical note summarization', journal: 'JAMIA', pub_date: '2023-11-08', view_count: 9870 },
  { _id: 'PMC11223344', title: 'Federated learning for privacy-preserving medical image analysis', journal: 'Nature Medicine', pub_date: '2024-05-22', view_count: 8640 },
  { _id: 'PMC55667788', title: 'Explainable AI in clinical decision support', journal: 'The Lancet Digital Health', pub_date: '2024-02-10', view_count: 7420 }
]

export const MOCK_ARTICLE_DETAIL = {
  _id: 'PMC12345678',
  title: 'Deep learning for breast cancer detection in mammography: a systematic review and meta-analysis',
  abstract: 'Background: Breast cancer is the most common cancer among women worldwide. Early detection through mammography screening significantly reduces mortality. Deep learning algorithms have shown promise in improving the accuracy and efficiency of mammography interpretation. This systematic review and meta-analysis evaluates the performance of deep learning models for breast cancer detection in mammography images. Methods: We searched PubMed, Embase, and Cochrane databases for studies published between January 2015 and December 2023. Two independent reviewers screened titles, abstracts, and full texts. Data extraction included study characteristics, model architectures, and diagnostic performance metrics. Results: Twenty-three studies met inclusion criteria, encompassing 1.2 million mammography exams. The pooled sensitivity of deep learning models was 0.91 (95% CI: 0.88-0.93) and specificity was 0.86 (95% CI: 0.83-0.89). Convolutional neural networks, particularly ResNet and DenseNet architectures, demonstrated superior performance. Conclusion: Deep learning models achieve high sensitivity and specificity for breast cancer detection in mammography, comparable to or exceeding radiologist performance. Integration of these models into clinical workflows may improve screening outcomes and reduce radiologist workload.',
  mesh_terms: ['Breast Neoplasms', 'Deep Learning', 'Mammography', 'Neural Networks, Computer', 'Sensitivity and Specificity'],
  authors: ['Smith JD', 'Johnson AL', 'Williams RK', 'Brown LM', 'Davis MP'],
  journal: 'Radiology: Artificial Intelligence',
  pub_date: '2024-03-15',
  score: 0.94,
  institution: 'Department of Radiology, Stanford University School of Medicine',
  study_type: 'Systematic Review and Meta-Analysis',
  population: 'General female population undergoing mammography screening',
  full_text_available: false,
  pubmed_url: 'https://pubmed.ncbi.nlm.nih.gov/12345678/',
  full_text_url: null
}
