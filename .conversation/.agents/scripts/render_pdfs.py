import fitz, os
for src, stem in [
 ('attached_assets/Avighna_Flyer_a4_(4_flyers)_1788962594057.pdf','avighna_flyer'),
 ('attached_assets/Ganesh_Inc_Brochure_1788962594058.pdf','ganesh_brochure')
]:
    doc=fitz.open(src)
    print(stem, 'pages', doc.page_count, 'metadata', doc.metadata)
    for i,p in enumerate(doc):
        pix=p.get_pixmap(matrix=fitz.Matrix(1.5,1.5), alpha=False)
        out=f'.agents/outputs/{stem}_{i+1}.png'
        pix.save(out)
        print(' rendered', out, p.rect)
        for img in p.get_images(full=True):
            xref=img[0]
            data=doc.extract_image(xref)
            ext=data['ext']
            out_img=f'.agents/outputs/{stem}_{i+1}_{xref}.{ext}'
            open(out_img,'wb').write(data['image'])
            print(' extracted',out_img, len(data['image']))
